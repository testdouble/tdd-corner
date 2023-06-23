class Proposal < ApplicationRecord
  validates :title, presence: true

  has_many :comments
  belongs_to :owner, class_name: User.to_s

  def soft_delete
    self.deleted_at = Time.zone.now
    self.save!
  end

  def self.not_deleted
    self.where(deleted_at: nil)
  end
end
