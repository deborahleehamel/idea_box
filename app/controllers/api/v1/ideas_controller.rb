class Api::V1::IdeasController < ApplicationController
  respond_to :json

def index
  render json: Idea.all.order("created_at DESC")
end

def create
  render json: Idea.create(idea_params)
end

def destroy
  Idea.delete(params[:id])
end

private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end
