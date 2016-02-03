FactoryGirl.define do
  factory :user do
    sequence(:username) { |i| "login#{i}"}
    sequence(:email) { |i| "email#{i}@mail.ru"}
    password 'password'
  end
end