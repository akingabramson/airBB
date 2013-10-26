# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :court do
    name Faker::Name.name
    latitude Faker::Address.latitude
    longitude Faker::Address.longitude
  end
end
