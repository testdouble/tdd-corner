class CommentsController < ApplicationController
  def create
    Comment.create!(
      proposal_id: params[:comment][:proposal_id],
      text: params[:comment][:new_comment]
    )
    redirect_to proposal_path(params[:comment][:proposal_id])
  end
end
