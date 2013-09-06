object @court
attributes :name
child :check_ins do
  attributes :created_at
  child :user => :checked_in_baller do 
  	attributes :id, :name
  end
end
