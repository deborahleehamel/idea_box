require 'rails_helper'

RSpec.describe Idea, type: :model do
  it "is valid with valid attributes" do
    expect(Idea.new).to be_valid
  end

  it "is not valid without a title"
  it "is not valid without a body"
  it "is not valid without a quality"
end
