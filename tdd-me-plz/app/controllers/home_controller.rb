class HomeController < ApplicationController
    def index
        @proposals = Proposal.all
    end
end
