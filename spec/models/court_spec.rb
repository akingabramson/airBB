require 'spec_helper'

describe Court do
  it "can be successfully created" do
    expect(FactoryGirl.build(:court).valid?).to be_true
  end

  it {should validate_presence_of(:name)}
  it {should validate_presence_of(:latitude)}
  it {should validate_presence_of(:longitude)}
  it {should have_many(:check_ins)}
  it {should have_many(:checked_in_users)}


  describe "::find_by_direction" do
    it "handles cases that wrap the crossover point"
      # san_francisco_court = Court.new(:name => "SF Court",
      #                                 :latitude => 37.802895,
      #                                 :longitude => 122.414334)
    it "fetches correct courts based on lat lng"
  end
end
