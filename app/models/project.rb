class Project < ActiveRecord::Base
  has_many :tasks, :dependent => :destroy
  belongs_to :user

  def as_json(options = {})
    super(options.merge(include: :tasks))
  end
end
