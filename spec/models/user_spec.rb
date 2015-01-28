require 'rails_helper'

RSpec.describe User, :type => :model do
  
  it 'has a valid factory' do
    expect(FactoryGirl.build(:user)).to be_valid
  end

  it 'is invalid without a name' do
    user = FactoryGirl.build(:user, name: nil)
    expect(user).to be_invalid
  end

  it 'is invalid without an email' do
    user = FactoryGirl.build(:user, email: nil)
    expect(user).to be_invalid
  end

  
  it 'is invalid if email is not formatted properly' do

    user = FactoryGirl.build(:user, email: 'asdfgh')
    expect(user).to be_invalid
  end

  it 'is invalid if email already exists' do
    user = FactoryGirl.create(:user, email: 'jack@gmail.com')

    user1 = FactoryGirl.build(:user, email: 'jack@gmail.com')

    user2 = FactoryGirl.build(:user, email: 'jack@gmail.com')

    expect(user1).to be_invalid
    expect(user2).to be_invalid
  end

end
