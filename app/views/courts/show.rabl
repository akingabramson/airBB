object @court
attributes :name
child :active => :check_ins do
	attributes :id, :created_at
	child :user => :baller do
    attributes :id, :username
  end
end