require_relative '../spec_helper.rb'

describe User do
  it "saves successfully with username, email and password" do
    a = FactoryGirl.build(:user)
    expect(a.valid?).to be_true
  end

  it "validates presence of email" do
    a = FactoryGirl.build(:user)
    a.email = nil
    expect(a.valid?).to be_false

  end

  it "validates presence of password" do
    a = FactoryGirl.build(:user)
    a.password = nil
    expect(a.valid?).to be_false
  end

  it { should have_many(:check_ins)} 
  it { should have_many(:checked_in_courts)}
end