module API
  class PostsController < ApplicationController

    protect_from_forgery with: :null_session

    respond_to :html, :xml, :json

    def index
      respond_with Post.all
    end

    def show
      respond_with Post.find(params[:id])
    end

    def create
      post = Post.new(post_params)

      if post.save
        render json: book, status: 201
      else
        render json: {errors: post.errors}, status: 422
      end
    end

    def update
      post = Post.find(params[:id])
      if post.update(post_params)
        render json: post,
        status: 200
      else
        render json: {errors: post.errors}, status: 422
      end
    end

    def destroy
      post = Post.find(params[:id])
      post.destroy
      head 204
    end

    private
    
      def post_params
        params.require(:post).permit(:title, :link)
      end
      

  end
end