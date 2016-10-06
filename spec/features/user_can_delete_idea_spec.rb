require 'rails_helper'

RSpec.feature "user can delete idea", js: true do
  fixtures :ideas
    scenario "removes idea from database" do
      idea = ideas(:one)

      visit "/"

      click_button(idea.id)

      expect(page).to_not have_content(idea.title)
      expect(page).to_not have_content(idea.body)
    end

  end

end
