object @check_in
attributes :id, :created_at
child :user => :baller do
  attributes :id, :username
end