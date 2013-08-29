class Court < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :name
  validates :name, presence: true, uniqueness: true
  validates :latitude, presence: true, uniqueness: {scope: :longitude}

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
    
    # p southwest

    # Court.where(:latitude => )
    Court.find_by_sql([query, southwest[:latitude].to_f, northeast[:latitude].to_f,
                               southwest[:longitude].to_f, northeast[:longitude].to_f])

  end

end
