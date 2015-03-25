class PopulationController < ApplicationController
  # GET /population/1
  # GET /population/1.json
  def show
  	Rails.logger = Logger.new(STDOUT)
  	logger.info "fips code is :" << params[:id]
  	fips = params[:id]
  	if(fips.length == 4)
  		fips = "0"<<fips
  	end
  	state = fips[0, 2]
  	county = fips[2, fips.length - 1]
  	logger.info "state code is :" << state
  	logger.info "county code is :" << county
  	response = HTTParty.get('http://api.census.gov/data/2010/sf1?get=P0010001,P0120002,P0030002,P0030003,P0030005,P0030004,P0030006,P0030008,P0030007&for=county:'<<county<<'&in=state:'<<state<<'&key=a81b69c2d8637be2124661c1dfdddf4f7dd03adf')   
    if(response.code == 200) then
    	result = eval(response.body)

    	total = result[1][0].to_i
    	maleNumber = result[1][1].to_i
    	femaleNumber = total - maleNumber
    	whiteNumber = result[1][2].to_i
    	blackNumber = result[1][3].to_i
    	asianNumber = result[1][4].to_i
    	americanIndianAlaskaNativeNumber = result[1][5].to_i
    	nativeHawaiianNumber = result[1][6].to_i
    	twoOrMoreNumber = result[1][7].to_i
    	otherRaceNumber = result[1][8].to_i

    	male = Male.new(maleNumber,(maleNumber.to_f * 100/total).round(2))
    	female = Female.new(femaleNumber,(femaleNumber.to_f * 100/total).round(2))
    	sex = Sex.new(male,female)

    	white = White.new(whiteNumber,(whiteNumber.to_f * 100/total).round(2))
    	black = Black.new(blackNumber,(blackNumber.to_f * 100/total).round(2))
    	asian = Asian.new(asianNumber,(asianNumber.to_f * 100/total).round(2))
    	americanIndianAlaskaNative = AmericanIndianAlaskaNative.new(americanIndianAlaskaNativeNumber,(americanIndianAlaskaNativeNumber.to_f * 100/total).round(2))
    	nativeHawaiian = NativeHawaiian.new(nativeHawaiianNumber,(nativeHawaiianNumber.to_f * 100/total).round(2))
    	twoOrMore = OtherRace.new(twoOrMoreNumber,(twoOrMoreNumber.to_f * 100/total).round(2))
    	otherRace = OtherRace.new(otherRaceNumber,(otherRaceNumber.to_f * 100/total).round(2))

    	race = Race.new(white, black, americanIndianAlaskaNative, asian, nativeHawaiian, otherRace, twoOrMore)

    	population = Population.new(total, race, sex)
      
      render json: population
    else
      render json: "{}"
    end
  end
end
class Population
   def initialize(total, race, sex)
      @race = race
      @sex = sex
      @total = total
   end
end
class Sex
   def initialize(male, female)
      @male = male
      @female = female
   end
end
class Female
   def initialize(number, percent)
      @number = number
      @percent = percent
   end
end
class Male
   def initialize(number, percent)
      @number = number
      @percent = percent
   end
end
class Race
   def initialize(white, black, americanIndianAlaskaNative, asian, nativeHawaiian, otherRace, twoOrMore)
      @white = white
      @black = black
      @americanIndianAlaskaNative = americanIndianAlaskaNative
      @asian = asian
      @nativeHawaiian = nativeHawaiian
      @otherRace = otherRace
      @twoOrMore = twoOrMore
   end
end
class White
   def initialize(number, percent)
      @number = number
      @percent = percent
   end
end
class Black
   def initialize(number, percent)
      @number = number
      @percent = percent
   end
end
class AmericanIndianAlaskaNative
   def initialize(number, percent)
      @number = number
      @percent = percent
   end
end
class Asian
   def initialize(number, percent)
      @number = number
      @percent = percent
   end
end
class NativeHawaiian
   def initialize(number, percent)
      @number = number
      @percent = percent
   end
end
class OtherRace
   def initialize(number, percent)
      @number = number
      @percent = percent
   end
end
class TwoOrMore
   def initialize(number, percent)
      @number = number
      @percent = percent
   end
end