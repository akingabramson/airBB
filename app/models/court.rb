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

    Court.find_by_sql([query, southwest[:latitude], northeast[:latitude],
                               southwest[:longitude], northeast[:longitude]])

  end

end
