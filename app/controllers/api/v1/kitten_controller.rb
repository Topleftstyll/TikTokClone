module Api::V1
    class KittenController < ApplicationController
        def index
            @kittens = Kitten.all
            render json: @kittens
        end

        def create
            @kitten = Kitten.new(kitten_params)
        
            if @kitten.save
                render json: @kitten
            end
        end

        private
        def kitten_params
            params.require(:kitten).permit(:url)
        end
    end
end