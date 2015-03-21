require 'test_helper'

class EqiDetailsControllerTest < ActionController::TestCase
  setup do
    @eqi_detail = eqi_details(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:eqi_details)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create eqi_detail" do
    assert_difference('EqiDetail.count') do
      post :create, eqi_detail: { countyCode: @eqi_detail.countyCode, countyDescription: @eqi_detail.countyDescription, domain: @eqi_detail.domain, stateCode: @eqi_detail.stateCode, stateDescription: @eqi_detail.stateDescription, variableCode: @eqi_detail.variableCode, variableDescription: @eqi_detail.variableDescription, variableValue: @eqi_detail.variableValue }
    end

    assert_redirected_to eqi_detail_path(assigns(:eqi_detail))
  end

  test "should show eqi_detail" do
    get :show, id: @eqi_detail
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @eqi_detail
    assert_response :success
  end

  test "should update eqi_detail" do
    patch :update, id: @eqi_detail, eqi_detail: { countyCode: @eqi_detail.countyCode, countyDescription: @eqi_detail.countyDescription, domain: @eqi_detail.domain, stateCode: @eqi_detail.stateCode, stateDescription: @eqi_detail.stateDescription, variableCode: @eqi_detail.variableCode, variableDescription: @eqi_detail.variableDescription, variableValue: @eqi_detail.variableValue }
    assert_redirected_to eqi_detail_path(assigns(:eqi_detail))
  end

  test "should destroy eqi_detail" do
    assert_difference('EqiDetail.count', -1) do
      delete :destroy, id: @eqi_detail
    end

    assert_redirected_to eqi_details_path
  end
end
