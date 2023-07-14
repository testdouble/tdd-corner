class Comment < ApplicationRecord
  belongs_to :proposal
  belongs_to :owner, class_name: User.to_s
end
