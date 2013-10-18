class Court < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :name
  validates :name, presence: true, uniqueness: true
  validates :longitude, presence: true
  validates :latitude, presence: true, uniqueness: {scope: :longitude}

  has_many :check_ins
  has_many :checked_in_users, through: :check_ins, source: :user

  delegate :active, to: :check_ins

  def self.find_by_direction(southwest, northeast)
    # make sure they are ints to avoid sql injection?
    query = <<-SQL 
      SELECT * 
      FROM courts
      WHERE latitude > ?
      AND latitude < ?
      AND longitude > ?
      AND longitude < ?
    SQL
    
    Court.find_by_sql([query, southwest[:latitude].to_f, northeast[:latitude].to_f,
                               southwest[:longitude].to_f, northeast[:longitude].to_f])
  end

  def current_ballers
    query = <<-SQL
      SELECT users.id, users.username, check_ins.created_at
      FROM users
      INNER JOIN check_ins 
      ON users.id = check_ins.user_id
      WHERE check_ins.court_id = ?
      AND NOT expired
    SQL

    User.find_by_sql([query, id])
  end

  # def nested_ballers
  #   CheckIn.joins(users: [:id, :username]).where(:court_id => id)
  # end

  def baller_count
    active.count
  end

end
