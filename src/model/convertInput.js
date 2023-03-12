let inputFields = ['num_floors',
    'num_bed_rooms',
    'squared_meter_area',
    'length_meter',
    'width_meter',
    'housing_type_Nhà biệt thự',
    'housing_type_Nhà mặt phố, mặt tiền',
    'housing_type_Nhà ngõ, hẻm',
    'housing_type_Nhà phố liền kề',
    'legal_paper_Giấy tờ khác',
    'legal_paper_Đang chờ sổ',
    'legal_paper_Đã có sổ',
    'district_Ba Đình',
    'district_Bắc Từ Liêm',
    'district_Cầu Giấy',
    'district_Hai Bà Trưng',
    'district_Hoàn Kiếm',
    'district_Hoàng Mai',
    'district_Huyện Chương Mỹ',
    'district_Huyện Gia Lâm',
    'district_Huyện Hoài Đức',
    'district_Huyện Mê Linh',
    'district_Huyện Phúc Thọ',
    'district_Huyện Quốc Oai',
    'district_Huyện Sóc Sơn',
    'district_Huyện Thanh Oai',
    'district_Huyện Thanh Trì',
    'district_Huyện Thường Tín',
    'district_Huyện Thạch Thất',
    'district_Huyện Đan Phượng',
    'district_Huyện Đông Anh',
    'district_Hà Đông',
    'district_Long Biên',
    'district_Nam Từ Liêm',
    'district_Thanh Xuân',
    'district_Thị xã Sơn Tây',
    'district_Tây Hồ',
    'district_Đống Đa',
    'ward_Biên Giang',
    'ward_Bách Khoa',
    'ward_Bùi Thị Xuân',
    'ward_Bưởi',
    'ward_Bạch Mai',
    'ward_Bạch Đằng',
    'ward_Bồ Đề',
    'ward_Chương Dương',
    'ward_Cát Linh',
    'ward_Cầu Diễn',
    'ward_Cầu Dền',
    'ward_Cống Vị',
    'ward_Cổ Nhuế 1',
    'ward_Cổ Nhuế 2',
    'ward_Cửa Nam',
    'ward_Cửa Đông',
    'ward_Cự Khối',
    'ward_Dương Nội',
    'ward_Dịch Vọng',
    'ward_Dịch Vọng Hậu',
    'ward_Gia Thụy',
    'ward_Giang Biên',
    'ward_Giáp Bát',
    'ward_Giảng Võ',
    'ward_Hoàng Liệt',
    'ward_Hoàng Văn Thụ',
    'ward_Hà Cầu',
    'ward_Hàng Buồm',
    'ward_Hàng Bài',
    'ward_Hàng Bông',
    'ward_Hàng Bồ',
    'ward_Hàng Bột',
    'ward_Hàng Gai',
    'ward_Hàng Mã',
    'ward_Hàng Trống',
    'ward_Hàng Đào',
    'ward_Hạ Đình',
    'ward_Khâm Thiên',
    'ward_Khương Mai',
    'ward_Khương Thượng',
    'ward_Khương Trung',
    'ward_Khương Đình',
    'ward_Kim Giang',
    'ward_Kim Liên',
    'ward_Kim Mã',
    'ward_Kiến Hưng',
    'ward_La Khê',
    'ward_Liên Mạc',
    'ward_Liễu Giai',
    'ward_Long Biên',
    'ward_Láng Hạ',
    'ward_Láng Thượng',
    'ward_Lê Đại Hành',
    'ward_Lý Thái Tổ',
    'ward_Lĩnh Nam',
    'ward_Mai Dịch',
    'ward_Mai Động',
    'ward_Minh Khai',
    'ward_Mễ Trì',
    'ward_Mộ Lao',
    'ward_Mỹ Đình 1',
    'ward_Mỹ Đình 2',
    'ward_Nam Đồng',
    'ward_Nghĩa Tân',
    'ward_Nghĩa Đô',
    'ward_Nguyễn Du',
    'ward_Nguyễn Trung Trực',
    'ward_Nguyễn Trãi',
    'ward_Ngã Tư Sở',
    'ward_Ngô Quyền',
    'ward_Ngô Thì Nhậm',
    'ward_Ngọc Hà',
    'ward_Ngọc Khánh',
    'ward_Ngọc Lâm',
    'ward_Ngọc Thụy',
    'ward_Nhân Chính',
    'ward_Nhật Tân',
    'ward_Phan Chu Trinh',
    'ward_Phú Diễn',
    'ward_Phú La',
    'ward_Phú Lãm',
    'ward_Phú Lương',
    'ward_Phú Thượng',
    'ward_Phú Thịnh',
    'ward_Phú Đô',
    'ward_Phúc Diễn',
    'ward_Phúc La',
    'ward_Phúc Lợi',
    'ward_Phúc Tân',
    'ward_Phúc Xá',
    'ward_Phúc Đồng',
    'ward_Phương Canh',
    'ward_Phương Liên',
    'ward_Phương Liệt',
    'ward_Phương Mai',
    'ward_Phạm Đình Hổ',
    'ward_Phố Huế',
    'ward_Quan Hoa',
    'ward_Quang Trung',
    'ward_Quán Thánh',
    'ward_Quảng An',
    'ward_Quốc Tử Giám',
    'ward_Quỳnh Lôi',
    'ward_Quỳnh Mai',
    'ward_Sài Đồng',
    'ward_Thanh Lương',
    'ward_Thanh Nhàn',
    'ward_Thanh Trì',
    'ward_Thanh Xuân Bắc',
    'ward_Thanh Xuân Nam',
    'ward_Thanh Xuân Trung',
    'ward_Thành Công',
    'ward_Thượng Cát',
    'ward_Thượng Thanh',
    'ward_Thượng Đình',
    'ward_Thạch Bàn',
    'ward_Thị trấn Chúc Sơn',
    'ward_Thị trấn Phùng',
    'ward_Thị trấn Quang Minh',
    'ward_Thị trấn Sóc Sơn',
    'ward_Thị trấn Trâu Quỳ',
    'ward_Thị trấn Trạm Trôi',
    'ward_Thị trấn Văn Điển',
    'ward_Thị trấn Yên Viên',
    'ward_Thị trấn Đông Anh',
    'ward_Thịnh Liệt',
    'ward_Thịnh Quang',
    'ward_Thổ Quan',
    'ward_Thụy Khuê',
    'ward_Thụy Phương',
    'ward_Trung Hoà',
    'ward_Trung Liệt',
    'ward_Trung Phụng',
    'ward_Trung Tự',
    'ward_Trung Văn',
    'ward_Tràng Tiền',
    'ward_Trúc Bạch',
    'ward_Trương Định',
    'ward_Trần Hưng Đạo',
    'ward_Trần Phú',
    'ward_Tân Mai',
    'ward_Tây Mỗ',
    'ward_Tây Tựu',
    'ward_Tương Mai',
    'ward_Tứ Liên',
    'ward_Việt Hưng',
    'ward_Văn Chương',
    'ward_Văn Miếu',
    'ward_Văn Quán',
    'ward_Vĩnh Hưng',
    'ward_Vĩnh Phúc',
    'ward_Vĩnh Tuy',
    'ward_Vạn Phúc',
    'ward_Xuân La',
    'ward_Xuân Phương',
    'ward_Xuân Tảo',
    'ward_Xuân Đỉnh',
    'ward_Xã An Khánh',
    'ward_Xã An Thượng',
    'ward_Xã Bích Hòa',
    'ward_Xã Bắc Hồng',
    'ward_Xã Cổ Bi',
    'ward_Xã Cổ Đông',
    'ward_Xã Cự Khê',
    'ward_Xã Di Trạch',
    'ward_Xã Duyên Thái',
    'ward_Xã Dương Liễu',
    'ward_Xã Dương Quang',
    'ward_Xã Hoàng Văn Thụ',
    'ward_Xã Hương Ngải',
    'ward_Xã Hải Bối',
    'ward_Xã Hữu Hoà',
    'ward_Xã Khánh Hà',
    'ward_Xã Kim Chung',
    'ward_Xã Kim Hoa',
    'ward_Xã Kim Sơn',
    'ward_Xã Kiêu Kỵ',
    'ward_Xã La Phù',
    'ward_Xã Liên Ninh',
    'ward_Xã Lê Lợi',
    'ward_Xã Mai Lâm',
    'ward_Xã Nam Hồng',
    'ward_Xã Nghĩa Hương',
    'ward_Xã Ngũ Hiệp',
    'ward_Xã Ngọc Hồi',
    'ward_Xã Nhị Khê',
    'ward_Xã Phù Linh',
    'ward_Xã Phù Đổng',
    'ward_Xã Phú Cát',
    'ward_Xã Phú Cường',
    'ward_Xã Phương Trung',
    'ward_Xã Sài Sơn',
    'ward_Xã Sơn Đông',
    'ward_Xã Sơn Đồng',
    'ward_Xã Tam Hiệp',
    'ward_Xã Thanh Liệt',
    'ward_Xã Thượng Mỗ',
    'ward_Xã Thạch Hoà',
    'ward_Xã Tiên Dược',
    'ward_Xã Tiền Phong',
    'ward_Xã Tân Lập',
    'ward_Xã Tân Triều',
    'ward_Xã Tả Thanh Oai',
    'ward_Xã Tứ Hiệp',
    'ward_Xã Vân Canh',
    'ward_Xã Vân Côn',
    'ward_Xã Vân Nội',
    'ward_Xã Võng La',
    'ward_Xã Võng Xuyên',
    'ward_Xã Văn Bình',
    'ward_Xã Vĩnh Quỳnh',
    'ward_Xã Xuân Giang',
    'ward_Xã Yên Thường',
    'ward_Xã Đa Tốn',
    'ward_Xã Đình Xuyên',
    'ward_Xã Đông Dư',
    'ward_Xã Đông Hội',
    'ward_Xã Đông La',
    'ward_Xã Đông Mỹ',
    'ward_Xã Đại Yên',
    'ward_Xã Đại áng',
    'ward_Xã Đặng Xá',
    'ward_Xã Đức Thượng',
    'ward_Yên Hoà',
    'ward_Yên Nghĩa',
    'ward_Yên Phụ',
    'ward_Yên Sở',
    'ward_Yết Kiêu',
    'ward_Ô Chợ Dừa',
    'ward_Điện Biên',
    'ward_Đông Ngạc',
    'ward_Đại Kim',
    'ward_Đại Mỗ',
    'ward_Định Công',
    'ward_Đống Mác',
    'ward_Đồng Mai',
    'ward_Đồng Nhân',
    'ward_Đồng Tâm',
    'ward_Đồng Xuân',
    'ward_Đội Cấn',
    'ward_Đức Giang',
    'ward_Đức Thắng']

// 'num_floors',
//     'num_bed_rooms',
//     'squared_meter_area',
//     'length_meter',
//     'width_meter',
//     'housing_type_Nhà biệt thự',
//14 cau giay
//31 Ha don
export const genInput = ()=>{
    // let a= [4,4,45,5,9,1,0,0,0,1,0,0,1];
    let a= [5,5,24,4,6,0,1,0,0,1,0,0,0];
    for(let i=13;i<280;i++) {
        if(i==26) {
            a[i]=1
        }else{
            a[i]=0
        }
    }
    console.log("aaaaaaa",a,a.length,inputFields.length);
    return a;
  
}
export const convertInputmodel = (productInfo) =>{
    let intitInput = [];
    for(let i=0; i<280;i++) {
       
        intitInput[i]=0
    }
    // 'num_floors',
    // 'num_bed_rooms',
    // 'squared_meter_area',
    // 'length_meter',
    // 'width_meter',
    intitInput[0] = productInfo?.numFloors;
    intitInput[1] = productInfo.numBedRooms;
    intitInput[2] = +productInfo.squaredMeterArea;
    intitInput[3] = +productInfo.lengthMeter;
    intitInput[4] = +productInfo.widthMeter;
    
    // 'housing_type_Nhà biệt thự',
    // 'housing_type_Nhà mặt phố, mặt tiền',
    // 'housing_type_Nhà ngõ, hẻm',
    // 'housing_type_Nhà phố liền kề',
    intitInput[5] = (productInfo.houseType == 1) ? 1 : 0;
    intitInput[6] = (productInfo.houseType == 2) ? 1 : 0;
    intitInput[7] = (productInfo.houseType == 3) ? 1 : 0;
    intitInput[8] = (productInfo.houseType == 4) ? 1 : 0;

    //certificateOfland
    intitInput[9] = (productInfo.certificateOfland == 1) ? 1 : 0;
    intitInput[10] = (productInfo.certificateOfland == 2) ? 1: 0;
    intitInput[11] = (productInfo.certificateOfland == 3) ? 1: 0;
    
    //District
    let districrId = handelDistrict(productInfo.district,inputFields);
    for(let i = 12; i< 38;i++) {
        if(i == districrId) {
            intitInput[i] = 1;  
        } else {
            intitInput[i] =0;
        }
    }
    //ward 
    let wardId = handelWard(productInfo.ward,inputFields);
    console.log("WAAAAAAAA",wardId)
    for(let i = 38; i< 280;i++) {
        if(i == wardId) {
            intitInput[i] = 1;  
        } else {
            intitInput[i] =0;
        }

    }
    
    console.log("Finalllllllllll",intitInput)
    return intitInput;
}

const handelDistrict=(productDistrictInput,inputFields)=>{
    let districts = inputFields.splice(12,26)
    console.log("Districttttttttt",districts);
    let handelStrIp =  productDistrictInput.replace("Quận ","");
    console.log("AfterhandelDisstr--",handelStrIp,handelStrIp.length);
    console.log(districts,districts.length);
    let districtId = -1
    for(let i = 0 ; i < districts.length -1 ; i++) {
        
        let handelStr = districts[i].replace("district_","");
        // console.log("handelStr",handelStr);
        if(handelStrIp == handelStr) {
            districtId = i +13;
            console.log(districtId);
            console.log(districts[i]);
        }
    }
    return districtId;
}
const handelWard = (productWardInput,inputFields)=>{
    let wards = inputFields.splice(12,281)
    console.log("WARDDDDDD",wards);
    console.log("handelWardStr",productWardInput);
    let handelStrIp =  productWardInput.replace("Phường ","");
    console.log("AfterhandelWardStr--",handelStrIp,handelStrIp.length);
    console.log(wards,wards.length);
    let wardId = -1
    for(let i = 0 ; i< wards.length - 1 ; i++) {
        
        let handelStr = wards[i].replace("ward_","");
        if(handelStrIp == handelStr) {
            wardId = i + 39;
            console.log(wardId);
            console.log(wards[i]);
        }
    }
    return wardId;
}