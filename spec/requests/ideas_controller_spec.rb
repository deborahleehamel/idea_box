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

  xscenario "it deletes a single item" do
    idea1 = ideas(:one)
    idea2 = ideas(:two)

    expect(Idea.count).to eq(3)

    delete "/api/v1/ideas/#{idea1.id}"

    expect(Idea.count).to eq(1)
  end

  xscenario "it creates an item" do
    idea_params = {title: "Be healthy", body: "Eat more raw vegetables", quality: "swill"}

    expect(Idea.count).to eq 3


    post "api/v1/ideas", {idea: idea_params}

    ideas = JSON.parse(response.body)

    expect(response.status).to eq (201)

    expect(Idea.count).to eq 3
    expect(ideas["title"]).to eq "Be healthy"
    expect(ideas["body"]).to eq "Eat more raw vegetables"
    expect(ideas["quality"]).to eq "swill"
  end

end
