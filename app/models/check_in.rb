class CheckIn < ActiveRecord::Base
  EXPIRATION_MINUTES = 20

  attr_accessible :court_id, :user_id
  validates :court_id, presence: true
  validates :user_id, presence: true

  before_create :set_expired

  belongs_to :court
  belongs_to :user

  scope :active, where(expired: false)

  def self.refresh
    active.each do |check_in|
      if Time.now.utc - check_in.created_at.utc > 60*EXPIRATION_MINUTES
        check_in.expired = true
        check_in.save
      end
    end
  end

  def set_expired
    self.expired = false
    true
  end

  def checked_in_baller
    query = <<-SQL
      SELECT users.id, users.username
      FROM users
      INNER JOIN check_ins 
      ON users.id = check_ins.user_id
      WHERE check_ins.id = ?
      AND NOT expired
    SQL

    CheckIn.find_by_sql([query, id])
  end

end
