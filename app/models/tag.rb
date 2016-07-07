# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  tag        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ActiveRecord::Base
  validates :tag, presence: true

  has_many :taggings
  has_many :notes, through: :taggings

end
