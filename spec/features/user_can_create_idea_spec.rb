require 'rails_helper'

RSpec.feature "user can create idea", js: true do
  context "user can fill out fields" do
    scenario "new idea created in database" do

      visit "/"

      within(".idea-form") do
        fill_in 'Title', with: 'Insult'
        fill_in 'Body', with: 'Go to Mars!'
      end

      click_on "Save"

      expect(page).to have_content("Insult")
      expect(page).to have_content("Go to Mars!")
    end
  end
end
