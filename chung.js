// Y Thư Việt – Bản mẫu 2: menu điện thoại + trắc nghiệm demo
(function () {
  // ----- Nút menu (hamburger) -----
  var nut = document.querySelector('.nut-menu');
  var menu = document.getElementById('menu-chinh');
  if (nut && menu) {
    nut.addEventListener('click', function () {
      var mo = nut.getAttribute('aria-expanded') === 'true';
      nut.setAttribute('aria-expanded', String(!mo));
      nut.querySelector('.nut-menu__chu').textContent = mo ? 'Menu' : 'Đóng';
      menu.classList.toggle('mo', !mo);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nut.getAttribute('aria-expanded') === 'true') {
        nut.click();
        nut.focus();
      }
    });
  }

  // ----- Trắc nghiệm thể chất (bản thử, câu hỏi và kết quả là mẫu) -----
  var hop = document.getElementById('hop-tn');
  if (!hop) return;

  var cauHoi = [
    {
      hoi: 'Bạn có hay thấy mệt, hụt hơi dù chỉ làm việc nhẹ?',
      dap: [
        { chu: 'Thường xuyên', diem: { khi: 2 } },
        { chu: 'Thỉnh thoảng', diem: { khi: 1 } },
        { chu: 'Hiếm khi', diem: {} }
      ]
    },
    {
      hoi: 'Bạn thường sợ lạnh hay sợ nóng hơn?',
      dap: [
        { chu: 'Sợ lạnh, tay chân hay lạnh', diem: { duong: 2 } },
        { chu: 'Hay thấy nóng trong, khô miệng', diem: { am: 2 } },
        { chu: 'Bình thường, không rõ', diem: {} }
      ]
    },
    {
      hoi: 'Bạn có dễ ra mồ hôi khi chưa vận động nhiều?',
      dap: [
        { chu: 'Có, khá dễ ra mồ hôi ban ngày', diem: { khi: 2 } },
        { chu: 'Hay ra mồ hôi khi ngủ ban đêm', diem: { am: 1 } },
        { chu: 'Không', diem: {} }
      ]
    }
  ];

  var ketQua = {
    khi: {
      ten: 'Khí hư',
      mo_ta: 'Theo Trung y, người thể Khí hư thường dễ mệt, hụt hơi, dễ ra mồ hôi.',
      tra: 'Trà mẫu có Hoàng kỳ, Táo đỏ (xem trang trà mẫu)',
      mon: 'Cháo hạt sen, khoai mài (món ăn mẫu)',
      tap: 'Bài thở chậm bằng bụng, 10 phút mỗi sáng (bài tập mẫu)'
    },
    duong: {
      ten: 'Dương hư',
      mo_ta: 'Theo Trung y, người thể Dương hư thường sợ lạnh, tay chân hay lạnh.',
      tra: 'Trà mẫu có Gừng, Quế (gợi ý mẫu)',
      mon: 'Canh gà nấu gừng (món ăn mẫu)',
      tap: 'Xoa ấm lòng bàn tay, bàn chân buổi tối (bài tập mẫu)'
    },
    am: {
      ten: 'Âm hư',
      mo_ta: 'Theo Trung y, người thể Âm hư thường hay nóng trong, khô miệng.',
      tra: 'Trà mẫu có Mạch môn, Kỷ tử (gợi ý mẫu)',
      mon: 'Lê chưng đường phèn (món ăn mẫu)',
      tap: 'Thở chậm, thư giãn trước khi ngủ (bài tập mẫu)'
    },
    binh: {
      ten: 'Bình hoà',
      mo_ta: 'Theo Trung y, thể Bình hoà là thể chất tương đối cân bằng.',
      tra: 'Trà mẫu dịu nhẹ, dùng theo mùa (gợi ý mẫu)',
      mon: 'Ăn uống điều độ theo mùa (gợi ý mẫu)',
      tap: 'Duy trì vận động nhẹ hằng ngày (bài tập mẫu)'
    }
  };

  var buoc = 0;
  var chon = [];
  var noiDung = document.getElementById('tn-noi-dung');
  var nhanBuoc = document.getElementById('tn-buoc');
  var thanh = document.getElementById('tn-thanh');

  function veCau() {
    var c = cauHoi[buoc];
    nhanBuoc.textContent = 'Câu ' + (buoc + 1) + ' / ' + cauHoi.length;
    thanh.style.width = ((buoc) / cauHoi.length * 100) + '%';
    var html = '<fieldset><legend>' + c.hoi + '</legend><div class="lua-chon">';
    c.dap.forEach(function (d, i) {
      var id = 'tn-' + buoc + '-' + i;
      var daChon = chon[buoc] === i ? ' checked' : '';
      html += '<label for="' + id + '"><input type="radio" name="tn-cau" id="' + id + '" value="' + i + '"' + daChon + '>' + d.chu + '</label>';
    });
    html += '</div></fieldset>';
    html += '<p class="loi-nhac" id="tn-loi" role="alert" aria-live="assertive"></p>';
    html += '<div class="hang-nut">';
    if (buoc > 0) html += '<button type="button" class="nut nut--vien" id="tn-lui">Quay lại</button>';
    html += '<button type="button" class="nut nut--chinh" id="tn-tiep">' + (buoc === cauHoi.length - 1 ? 'Xem kết quả' : 'Tiếp') + '</button>';
    html += '</div>';
    noiDung.innerHTML = html;

    document.getElementById('tn-tiep').addEventListener('click', tiep);
    var lui = document.getElementById('tn-lui');
    if (lui) lui.addEventListener('click', function () { buoc--; veCau(); focusCau(); });
  }

  function focusCau() {
    var leg = noiDung.querySelector('input[type=radio]');
    if (leg) leg.focus();
  }

  function tiep() {
    var o = noiDung.querySelector('input[name="tn-cau"]:checked');
    if (!o) {
      document.getElementById('tn-loi').textContent = '⚠ Vui lòng chọn một đáp án trước khi bấm tiếp.';
      return;
    }
    chon[buoc] = Number(o.value);
    if (buoc < cauHoi.length - 1) {
      buoc++;
      veCau();
      focusCau();
    } else {
      veKetQua();
    }
  }

  function veKetQua() {
    var tong = { khi: 0, duong: 0, am: 0 };
    chon.forEach(function (i, b) {
      var d = cauHoi[b].dap[i].diem;
      Object.keys(d).forEach(function (k) { tong[k] += d[k]; });
    });
    var khoa = 'binh', cao = 0;
    ['khi', 'duong', 'am'].forEach(function (k) {
      if (tong[k] > cao) { cao = tong[k]; khoa = k; }
    });
    var kq = ketQua[khoa];
    nhanBuoc.textContent = 'Kết quả mẫu';
    thanh.style.width = '100%';
    noiDung.innerHTML =
      '<div class="ket-qua" tabindex="-1" id="tn-kq">' +
      '<p class="tieu-de-phu">Thể chất của bạn (kết quả mẫu)</p>' +
      '<h3 class="ket-qua__ten">' + kq.ten + '</h3>' +
      '<p>' + kq.mo_ta + '</p>' +
      '<ul class="ket-qua__goi-y">' +
      '<li><span class="bieu-tuong-tron" aria-hidden="true">Trà</span><span><strong>Trà gợi ý:</strong> <a href="tra.html">' + kq.tra + '</a></span></li>' +
      '<li><span class="bieu-tuong-tron bieu-tuong-tron--vang" aria-hidden="true">Ăn</span><span><strong>Món ăn:</strong> ' + kq.mon + '</span></li>' +
      '<li><span class="bieu-tuong-tron" aria-hidden="true">Tập</span><span><strong>Bài tập:</strong> ' + kq.tap + '</span></li>' +
      '</ul>' +
      '<p class="ghi-chu-mau"><strong>Bản thử – câu hỏi và kết quả là mẫu.</strong> Bản chính thức có khoảng 5–10 câu, do thầy thuốc xem lại trước khi đăng. Kết quả chỉ để tham khảo, không thay thế việc khám và điều trị.</p>' +
      '<div class="hang-nut" style="margin-top:16px"><button type="button" class="nut nut--vien" id="tn-lam-lai">Làm lại</button></div>' +
      '</div>';
    document.getElementById('tn-lam-lai').addEventListener('click', function () {
      buoc = 0; chon = []; veCau(); focusCau();
    });
    document.getElementById('tn-kq').focus();
  }

  veCau();
})();
