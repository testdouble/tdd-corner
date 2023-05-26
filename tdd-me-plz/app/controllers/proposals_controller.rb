class ProposalsController < ApplicationController
  def new
    @proposal = Proposal.new(flash[:form_data])
  end

  def create
    @proposal = Proposal.create(
      title: params[:proposal][:title],
      description: params[:proposal][:description],
      contact: session[:user][:email]
    )

    if @proposal.valid?
      redirect_to root_path
    else
      flash[:errors] = @proposal.errors.map(&:full_message)
      flash[:form_data] = @proposal.attributes
      redirect_to '/proposals/new'
    end
  end

  def show
    user = User.find_by(email: session[:user][:email])
    @proposal = Proposal.find(params[:id])
    @can_delete = owns?(proposal: @proposal) || user.admin?
    @can_edit = owns?(proposal: @proposal) || user.admin?
  end

  def destroy
    proposal = Proposal.find(params[:id])
    if owns?(proposal: proposal)
      proposal.soft_delete
      redirect_to root_path
    else
      head :forbidden
    end
  end

  def update
    proposal = Proposal.find(params[:id])
    if owns?(proposal:proposal)
      proposal.update!(params.require(:proposal).permit(:title, :description))
      redirect_to proposal_path(proposal)
    else
      head :forbidden
    end
  end

  private
  def owns?(proposal:)
    session[:user][:email] == proposal.contact
  end
end
