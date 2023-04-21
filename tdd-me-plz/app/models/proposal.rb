class Proposal < ApplicationRecord
  validates :title, presence: true
  validates :contact, presence: true

  has_many :comments

  def soft_delete
    self.deleted_at = Time.zone.now
    self.save!
  end

  def self.not_deleted
    self.where(deleted_at: nil)
  end
end
