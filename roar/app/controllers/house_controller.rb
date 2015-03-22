class HouseController < ApplicationController

  # GET /house/1
  # GET /house/1.json
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
  	response = HTTParty.get('http://api.census.gov/data/2010/sf1?get=H0030001,H0030002,H0030003,H0040001,H0040002,H0040003,H0040004&for=county:'<<county<<'&in=state:'<<state<<'&key=a81b69c2d8637be2124661c1dfdddf4f7dd03adf')   
  	result = eval(response.body)

  	total = result[1][0].to_i
  	occupancyNumber = result[1][1].to_i
  	vacancyNumber = result[1][2].to_i
  	ownerOccupancyNumber = result[1][4].to_i+result[1][5].to_i
  	rentalOccupancyNumber = result[1][4].to_i

  	occupancy = Occupancy.new(occupancyNumber,(occupancyNumber * 100/total))
  	vacancy = Vacancy.new(vacancyNumber,(vacancyNumber * 100/total))  
  	ownerOccupancy = OwnerOccupancy.new(ownerOccupancyNumber,(ownerOccupancyNumber * 100/total))
  	rentalOccupancy = RentalOccupancy.new(rentalOccupancyNumber,(rentalOccupancyNumber * 100/total))
  	housing = Housing.new(total,vacancy,occupancy,rentalOccupancy,ownerOccupancy)
  	#logger.info "fips code is :" << resut[1][1]
    #render json: response.body
    render json: housing
  end

end

class Housing
   def initialize(total, vacancy, occupancy, rentalOccupancy, ownerOccupancy)
      @total = total
      @vacancy = vacancy
      @occupancy = occupancy
      @rentalOccupancy = rentalOccupancy
      @ownerOccupancy = ownerOccupancy
   end
end
class Vacancy
   def initialize(number, percent)
      @number = number
      @percent = percent
   end
end
class Occupancy
   def initialize(number, percent)
      @number = number
      @percent = percent
   end
end
class RentalOccupancy
   def initialize(number, percent)
      @number = number
      @percent = percent
   end
end
class OwnerOccupancy
   def initialize(number, percent)
      @number = number
      @percent = percent
   end
end