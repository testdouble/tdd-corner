class ProposalsController < ApplicationController
  def new
    @proposal = Proposal.new
  end

  def create
    @proposal = Proposal.create(
      title: params[:title]
    )
    redirect_to root_path
  end
end
