class HomeController < ApplicationController
    def index
        @proposals = Proposal.not_deleted
    end
end
