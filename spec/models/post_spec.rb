require 'rails_helper'

RSpec.describe Post, :type => :model do
  
  it "has a valid factory for post" do
    expect(FactoryGirl.build(:post)).to be_valid
  end

  it 'is invalid without a link' do     
    post = FactoryGirl.build(:post, link: nil)    
    expect(post).to be_invalid    
  end

  it 'has a valid link format' do
    post = FactoryGirl.build(:post, link: 'sadas')
    expect(post).to be_invalid
  end

  it 'is invalid without a title' do
    post = FactoryGirl.build(:post, title: nil)
    expect(post).to be_invalid
  end

  it 'is invalid when title is over 50 characters' do

    post = FactoryGirl.build(:post)
    post.title = "a" * 51
    expect(post).to be_invalid

  end

end
