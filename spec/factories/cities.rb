FactoryBot.define do
  factory :city do
    user { nil }
    name { Faker::Address.city }
  end
end
