class Proposal < ApplicationRecord
  validates :title, presence: true
  validates :contact, presence: true
end
