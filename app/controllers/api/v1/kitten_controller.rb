module Api::V1
    class KittenController < ApplicationController
        def index
            @kittens = Kitten.all
            render json: @kittens
        end

        # def create
        #     @post = current_user.posts.build(post_params)
        
        #     respond_to do |format|
        #         if @post.save
        #             format.html { redirect_to @post, notice: "Post was successfully created." }
        #             format.json { render :show, status: :created, location: @post }
        #         else
        #             format.html { render :new, status: :unprocessable_entity }
        #             format.json { render json: @post.errors, status: :unprocessable_entity }
        #         end
        #     end
        # end
    end
end