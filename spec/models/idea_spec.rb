require 'rails_helper'

RSpec.describe Idea, type: :model do
  fixtures :ideas
  it "is valid with valid attributes" do
    idea = ideas(:one)
    expect(idea).to be_valid
  end

  it "is not valid without a title" do
    invalid_idea = ideas(:invalid1)
    expect(invalid_idea).not_to be_valid
  end

  it "is not valid without a body" do
    invalid_idea = ideas(:invalid2)
    expect(invalid_idea).not_to be_valid
  end

  it "is not valid without a quality" do
    invalid_idea = ideas(:invalid3)
    expect(invalid_idea).not_to be_valid
  end

describe "#quality" do
  fixtures :ideas
  it "initially defaults to swill" do
    idea = ideas(:one)
    expect(idea.quality).to eq("swill")
  end
end

end
