class EqiResult
  include Mongoid::Document
  field :stateCode, type: String
  field :stateDescription, type: String
  field :countyCode, type: String
  field :countyDescription, type: String
  field :domain, type: String
  field :eqi, type: Float
end
