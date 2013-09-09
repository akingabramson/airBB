class CheckIn < ActiveRecord::Base
  attr_accessible :court_id, :user_id
  validates :court_id, presence: true
  validates :user_id, presence: true

  before_save :set_expired

  belongs_to :court
  belongs_to :user

  scope :active, where(expired: false)

  def set_expired
    self.expired = false
    true
  end

  def checked_in_baller
    query = <<-SQL
      SELECT users.*, check_ins.created_at
      FROM users
      INNER JOIN check_ins 
      ON users.id = check_ins.user_id
      WHERE check_ins.id = ?
      AND NOT expired
    SQL

    CheckIn.find_by_sql([query, id])
  end

end
