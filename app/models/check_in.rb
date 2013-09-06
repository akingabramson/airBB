class CheckIn < ActiveRecord::Base
  attr_accessible :court_id, :user_id
  scope :active, where(expired: false)

  before_create :set_expired

  validates :court_id, presence: true
  validates :user_id, presence: true
  # validates :expired, presence: true

  belongs_to :court
  belongs_to :user

  def set_expired
    self.expired = false
  end


end
