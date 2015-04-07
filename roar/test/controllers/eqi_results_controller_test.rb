require 'test_helper'

class EqiResultsControllerTest < ActionController::TestCase
 # setup do
    #@eqi_result = eqi_results(:one)
 # end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:eqi_results)
  end

  #test "should get new" do
  #  get :new
  #  assert_response :success
#end

  #test "should create eqi_result" do
   # assert_difference('EqiResult.count') do
  #    post :create, eqi_result: { "stateCode": "AL","stateDescription": "Alabama","countyCode": "01006","countyDescription": "Barbour1 County","domain": "Built"  }
  #  end

  #  assert_redirected_to eqi_result_path(assigns(:eqi_result))
 # end

 # test "should show eqi_result" do
  #  get :show, id: @eqi_result
 #   assert_response :success
 # end

 # test "should get edit" do
 #   get :edit, id: @eqi_result
 #   assert_response :success
 # end

 # test "should update eqi_result" do
 #   patch :update, id: @eqi_result, eqi_result: {  }
 #   assert_redirected_to eqi_result_path(assigns(:eqi_result))
 # end

 # test "should destroy eqi_result" do
 #   assert_difference('EqiResult.count', -1) do
 #     delete :destroy, id: @eqi_result
 #   end

  #  assert_redirected_to eqi_results_path
  #end
end
