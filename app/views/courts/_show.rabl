object @court
attributes :id, :name, :baller_count
child :check_ins do
	attributes :id, :created_at
	child :user => :baller do
    attributes :id, :username
  end
end