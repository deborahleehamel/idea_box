require "rails_helper"

  describe "Api::V1::IdeasController" do
    fixtures :ideas
    scenario "returns all ideas" do

      get "/api/v1/ideas"
      expect(response.status).to eq (200)

      ideas = JSON.parse(response.body)

      expect(ideas.count).to eq 6
      expect(ideas.first.keys).to eq ["id", "title", "body", "created_at", "updated_at", "quality"]
    end

  scenario "it creates an idea" do
    idea_params = {title: "Be healthy", body: "Eat more raw vegetables", quality: "swill"}

    expect(Idea.count).to eq 6

    post "/api/v1/ideas", params: {idea: idea_params}

    ideas = JSON.parse(response.body)

    expect(response.status).to eq (200)

    expect(Idea.count).to eq 7
    expect(ideas["title"]).to eq "Be healthy"
    expect(ideas["body"]).to eq "Eat more raw vegetables"
    expect(ideas["quality"]).to eq "swill"
  end

  scenario "it deletes a single idea" do
    idea1 = ideas(:one)
    idea2 = ideas(:two)

    expect(Idea.count).to eq(6)

    delete "/api/v1/ideas/#{idea1.id}"

    expect(Idea.count).to eq(5)
  end
end
