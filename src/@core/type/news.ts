export type NewsModel = {
  id: number
  title: string
  description: string
}

const newsList: NewsModel[] = [
  {
    id: 1,
    title: 'Kinh nghiệm dã ngoại tại Sapa',
    description:
      'Sapa nằm ở vùng núi phía Tây Bắc Việt Nam, được biết đến với cảnh quan thiên nhiên hùng vĩ và văn hóa dân tộc đa dạng. Khi dã ngoại tại Sapa, bạn có thể trải nghiệm cuộc sống của người dân bản địa, khám phá những cánh đồng lúa bậc thang xanh mướt, leo núi để ngắm cảnh hoặc thăm các bản làng dân tộc. Để có trải nghiệm tốt nhất, nên chuẩn bị trang thiết bị phù hợp, như giày leo núi, áo khoác ấm và đèn pin. Ngoài ra, việc thăm Sapa vào mùa nào cũng có những trải nghiệm đặc biệt. Mùa xuân, Sapa rực rỡ với hoa anh đào nở rộ. Mùa hè, cảnh quan xanh mát của Sapa là điểm đến lý tưởng để tránh nóng. Mùa thu, cánh đồng lúa bậc thang chuyển sang màu vàng rực rỡ. Mùa đông, Sapa bao phủ bởi màn sương mù huyền bí, tạo nên cảnh sắc huyền ảo và lãng mạn.',
  },
  {
    id: 2,
    title: 'Địa điểm dã ngoại gần Hà Nội',
    description:
      'Nếu bạn đang ở Hà Nội và muốn trốn nóng vào mùa hè hay thư giãn vào cuối tuần, có một số địa điểm dã ngoại gần Hà Nội rất thú vị. Các khu du lịch sinh thái như Ba Vì, Sầm Sơn, Tam Đảo, Mộc Châu đều là những điểm đến lý tưởng. Ba Vì có khí hậu mát mẻ, rừng già phong phú và nhiều điểm du lịch hấp dẫn như Suối Mơ, Thác Đa và Khoang Xanh. Sầm Sơn ở Thanh Hóa có bãi biển đẹp, cùng với các khu vui chơi giải trí và nhà hàng ngon. Tam Đảo ở Vĩnh Phúc có khí hậu se se lạnh, rừng thông xanh mướt và nhiều điểm tham quan như đỉnh Tam Đảo, Suối Vàng, và thác Bạc. Mộc Châu ở Sơn La nổi tiếng với cảnh đẹp mênh mông của thảo nguyên xanh mướt, hoa cải vàng nở rộ, là nơi lý tưởng cho những chuyến dã ngoại thú vị.',
  },
  {
    id: 3,
    title: 'Phượt mùa hè tại các bãi biển Việt Nam',
    description:
      'Việt Nam có hàng ngàn kilomet bờ biển, với những bãi biển đẹp mê hồn từ Bắc vào Nam. Trong mùa hè nóng bức, việc phượt tại các bãi biển là lựa chọn tuyệt vời để trải nghiệm làn nước biển mát lạnh, cát trắng mịn và ánh nắng ấm áp. Các bãi biển ở Việt Nam có thể kể đến như: bãi biển Mỹ Khê ở Đà Nẵng, bãi biển Cửa Đại ở Hội An, bãi biển Cửa Lò ở Nghệ An, bãi biển Vũng Tàu ở Bà Rịa - Vũng Tàu, và bãi biển Nha Trang ở Khánh Hòa. Khi phượt tại các bãi biển, hãy nhớ tuân thủ các quy định về an toàn của bãi biển, sử dụng kem chống nắng và bảo vệ da khỏi tác động của tia UV.',
  },
  {
    id: 4,
    title: 'Check-in cực chất tại các suối nước nóng',
    description:
      'Việt Nam có nhiều suối nước nóng tự nhiên, là điểm đến lý tưởng cho những ai muốn thư giãn và tận hưởng không gian thiên nhiên. Các suối nước nóng phổ biến như Suối Mơ ở Yên Bái, Suối Đá Thác ở Lào Cai, Suối nước nóng Thần Tài ở Quảng Ngãi, Suối nước nóng Bình Châu ở Bà Rịa - Vũng Tàu, và Suối nước nóng Thác Bờ ở Hòa Bình. Khi tới các suối nước nóng, bạn có thể tận hưởng cảm giác thư giãn của nước nóng, đắm mình trong không gian xanh mát của rừng cây xung quanh, và thư giãn cơ thể sau những ngày làm việc căng thẳng.',
  },
  {
    id: 5,
    title: 'Khám phá đảo ngọc Phú Quốc',
    description:
      'Phú Quốc là một trong những địa điểm dã ngoại hấp dẫn tại Việt Nam, nổi tiếng với bãi biển đẹp và nhiều hoạt động giải trí. Bạn có thể thăm Bãi Sao, một trong những bãi biển đẹp nhất của Phú Quốc, tham gia các hoạt động như lướt ván, snorkeling, hoặc đơn giản là tắm biển và thư giãn trên bờ cát trắng. Ngoài ra, đảo ngọc Phú Quốc còn có nhiều điểm tham quan khác như Suối Tranh, Đảo Ngọc, Hòn Thơm, và Vườn Quốc Gia Phú Quốc. Phú Quốc cũng nổi tiếng với ẩm thực đặc sản như hàu, sò điệp, và các món hải sản tươi ngon.',
  },
  {
    id: 6,
    title: 'Dã ngoại qua rừng núi Tây Bắc',
    description:
      'Tây Bắc Việt Nam là vùng đất của những ngọn núi cao, những thửa ruộng bậc thang và văn hóa dân tộc đa dạng. Khi dã ngoại qua rừng núi Tây Bắc, bạn sẽ được tham gia vào những hành trình khám phá đầy mạo hiểm và thú vị. Các điểm đến nổi tiếng ở Tây Bắc như Mù Cang Chải, Sơn La, Điện Biên, và Lai Châu đều mang đến những trải nghiệm độc đáo. Bạn có thể leo núi để ngắm cảnh, thăm các bản làng dân tộc vùng cao, và tìm hiểu văn hóa truyền thống của đồng bào dân tộc.',
  },
  {
    id: 7,
    title: 'Du lịch sinh thái tại Cần Thơ',
    description:
      'Cần Thơ là thành phố lớn nhất của Đồng Bằng Sông Cửu Long, nổi tiếng với văn hóa và ẩm thực đặc trưng. Ngoài việc thăm các điểm du lịch nổi tiếng như Cồn Sơn, Ninh Kiều, Bến Ninh Kiều, bạn cũng có thể trải nghiệm du lịch sinh thái tại Cần Thơ. Các khu vực như Tràm Chim, Vườn quốc gia Tràm Chim, và Bảy Núi cung cấp cơ hội khám phá thiên nhiên hoang dã và quan sát động vật. Du lịch sinh thái tại Cần Thơ không chỉ giúp bạn thư giãn mà còn mang lại những trải nghiệm gần gũi với thiên nhiên và văn hóa dân tộc.',
  },
  {
    id: 8,
    title: 'Dã ngoại tại vườn quốc gia Phong Nha - Kẻ Bàng',
    description:
      'Phong Nha - Kẻ Bàng là một trong những vườn quốc gia có diện tích lớn và đa dạng sinh học cao ở Việt Nam. Vườn quốc gia này nổi tiếng với hệ thống hang động kỳ vĩ, trong đó có Hang Sơn Đoòng - hang động lớn nhất thế giới. Khi dã ngoại tại Phong Nha - Kẻ Bàng, bạn có cơ hội khám phá những hang động đẹp như Hang Động Phong Nha, Hang Tối, Hang En, và đặc biệt là Hang Sơn Đoòng (cần phải có hướng dẫn và trang thiết bị đặc biệt). Ngoài việc khám phá hang động, bạn cũng có thể tham gia các hoạt động như trekking qua rừng, thăm bản làng dân tộc và thưởng thức ẩm thực địa phương.',
  },
  {
    id: 9,
    title: 'Thưởng thức văn hóa dã ngoại cùng người dân Đồng bằng Sông Cửu Long',
    description:
      'Đồng Bằng Sông Cửu Long không chỉ nổi tiếng với cảnh đẹp thiên nhiên mà còn là nơi giữ gìn và phát triển văn hóa dân tộc đa dạng. Khi dã ngoại cùng người dân Đồng Bằng Sông Cửu Long, bạn có cơ hội trải nghiệm cuộc sống của họ, thăm các làng nghề truyền thống, tham gia vào các hoạt động văn hóa và thưởng thức ẩm thực địa phương. Các điểm đến như Cần Thơ, Châu Đốc, Sóc Trăng, và Bạc Liêu đều có những trải nghiệm độc đáo về văn hóa dân tộc và ẩm thực.',
  },
  {
    id: 10,
    title: 'Những lưu ý an toàn khi dã ngoại tại Việt Nam',
    description:
      'Dã ngoại là hoạt động thú vị nhưng cũng có thể gặp một số rủi ro, đặc biệt là khi bạn tham gia ở môi trường tự nhiên hoang dã. Để đảm bảo an toàn cho chính mình và người thân, hãy tuân thủ một số nguyên tắc sau khi dã ngoại tại Việt Nam: 1. Chuẩn bị kỹ lưỡng trước khi ra ngoài, đảm bảo mang đủ đồ dùng cần thiết như nước uống, thức ăn, áo khoác, đèn pin, và trang thiết bị cần thiết khác. 2. Tìm hiểu kỹ về địa điểm mà bạn sẽ đến, bao gồm cả điều kiện thời tiết, địa hình và nguy cơ nguy hiểm có thể gặp phải. 3. Luôn đi theo nhóm khi tham gia các hoạt động dã ngoại, tránh đi một mình vào những khu vực hoang vu và xa lánh. 4. Luôn luôn tuân thủ các quy định và hướng dẫn của người địa phương, đặc biệt là khi tham gia vào các hoạt động như leo núi, trekking hoặc thăm hang động.',
  },
]

export const initialNews = (): NewsModel[] => {
  return newsList
}
