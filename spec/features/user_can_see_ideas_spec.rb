require 'rails_helper'

RSpec.feature "user can see ideas" do
  fixtures :ideas
  context "has ideas added" do
    scenario "see list of ideas descending order" do
      oldest_idea = ideas(:one)
      newest_idea = ideas(:two)

      visit "/"

      within(".idea-list") do
        expect(page).to have_content(oldest_idea.title)
        expect(page).to have_content(oldest_idea.body)
        expect(page).to have_content(oldest_idea.quality)
      end
    end
  end

end
