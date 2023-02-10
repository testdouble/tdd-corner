class ProposalsController < ApplicationController
  def new
    if session[:name].blank?
      redirect_to login_path, alert: 'You are not allowed'
    end

    @proposal = Proposal.new(flash[:form_data])
  end

  def create
    @proposal = Proposal.create(
      title: params[:proposal][:title],
      description: params[:proposal][:description],
      contact: session[:name]
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
    @proposal = Proposal.find(params[:id])
  end
end
