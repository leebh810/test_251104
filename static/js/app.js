// A야드 임시 데이터
const aYardData = {
  name: "A야드",
  location: "부산항 제1부두",
  capacity: "15,000톤",
  currentStock: "65톤",
  utilizationRate: "0.43%",
  status: "정상 운영",
  lastUpdate: "2025-01-06 14:30",
  details: {
    totalSpaces: 45,
    occupiedSpaces: 3,
    availableSpaces: 42,
    averageUtilization: "42%",
    peakHours: "09:00-12:00",
    expectedArrival: "2025-01-06 16:00",
  },
  equipment: {
    cranes: 2,
    forklifts: 5,
    status: "정상",
  },
  recentActivities: [
    "14:25 - 컨테이너 적재 완료 (10개)",
    "14:15 - 화물 하역 진행 중",
    "14:00 - 선박 입항 완료",
  ],
};

// 툴팁 생성 및 표시 함수
function createTooltip(data) {
  // 기존 툴팁 제거
  const existingTooltip = document.getElementById("yard-tooltip");
  if (existingTooltip) {
    existingTooltip.remove();
  }

  // 툴팁 요소 생성
  const tooltip = document.createElement("div");
  tooltip.id = "yard-tooltip";
  tooltip.className = "yard-tooltip";

  tooltip.innerHTML = `
    <div class="tooltip-header">
      <h4>${data.name} 상세 정보</h4>
      <span class="tooltip-close">×</span>
    </div>
    <div class="tooltip-content">
      <div class="tooltip-section">
        <div class="tooltip-row">
          <span class="tooltip-label">위치:</span>
          <span class="tooltip-value">${data.location}</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">최대 용량:</span>
          <span class="tooltip-value">${data.capacity}</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">현재 재고:</span>
          <span class="tooltip-value">${data.currentStock}</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">가동률:</span>
          <span class="tooltip-value">${data.utilizationRate}</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">상태:</span>
          <span class="tooltip-value status-${
            data.status === "정상 운영" ? "normal" : "warning"
          }">${data.status}</span>
        </div>
      </div>
      
      <div class="tooltip-divider"></div>
      
      <div class="tooltip-section">
        <h5>세부 정보</h5>
        <div class="tooltip-row">
          <span class="tooltip-label">총 구역:</span>
          <span class="tooltip-value">${data.details.totalSpaces}개</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">사용 중:</span>
          <span class="tooltip-value">${data.details.occupiedSpaces}개</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">가용 구역:</span>
          <span class="tooltip-value">${data.details.availableSpaces}개</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">피크 시간:</span>
          <span class="tooltip-value">${data.details.peakHours}</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">예상 도착:</span>
          <span class="tooltip-value">${data.details.expectedArrival}</span>
        </div>
      </div>
      
      <div class="tooltip-divider"></div>
      
      <div class="tooltip-section">
        <h5>장비 현황</h5>
        <div class="tooltip-row">
          <span class="tooltip-label">크레인:</span>
          <span class="tooltip-value">${data.equipment.cranes}대</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">지게차:</span>
          <span class="tooltip-value">${data.equipment.forklifts}대</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">장비 상태:</span>
          <span class="tooltip-value status-normal">${
            data.equipment.status
          }</span>
        </div>
      </div>
      
      <div class="tooltip-divider"></div>
      
      <div class="tooltip-section">
        <h5>최근 활동</h5>
        <ul class="tooltip-activity-list">
          ${data.recentActivities
            .map((activity) => `<li>${activity}</li>`)
            .join("")}
        </ul>
      </div>
      
      <div class="tooltip-footer">
        <span class="tooltip-update">마지막 업데이트: ${data.lastUpdate}</span>
      </div>
    </div>
  `;

  document.body.appendChild(tooltip);

  // 닫기 버튼 이벤트
  const closeBtn = tooltip.querySelector(".tooltip-close");
  closeBtn.addEventListener("click", () => {
    tooltip.remove();
  });

  // 툴팁 위치 조정
  updateTooltipPosition(tooltip);

  return tooltip;
}

// 툴팁 위치 업데이트
function updateTooltipPosition(tooltip) {
  const aYardCard = document.getElementById("a-yard-card");
  if (!aYardCard) return;

  const rect = aYardCard.getBoundingClientRect();
  const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;

  // 툴팁을 카드 오른쪽에 배치
  tooltip.style.left = `${rect.right + 20 + scrollX}px`;
  tooltip.style.top = `${rect.top + scrollY}px`;

  // 화면 밖으로 나가지 않도록 조정
  const tooltipRect = tooltip.getBoundingClientRect();
  if (tooltipRect.right > window.innerWidth) {
    tooltip.style.left = `${rect.left - tooltipRect.width - 20 + scrollX}px`;
  }
  if (tooltipRect.bottom > window.innerHeight) {
    tooltip.style.top = `${
      window.innerHeight - tooltipRect.height - 20 + scrollY
    }px`;
  }
}

// 페이지 로드 완료 시 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", function () {
  const aYardCard = document.getElementById("a-yard-card");

  if (aYardCard) {
    let tooltip = null;
    let hideTimeout = null;

    function updateTooltipOnEvent() {
      if (tooltip) {
        updateTooltipPosition(tooltip);
      }
    }

    function removeTooltip() {
      if (tooltip) {
        tooltip.remove();
        tooltip = null;
      }
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      window.removeEventListener("scroll", updateTooltipOnEvent);
      window.removeEventListener("resize", updateTooltipOnEvent);
    }

    // 마우스 진입 시
    aYardCard.addEventListener("mouseenter", function (e) {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      if (!tooltip) {
        tooltip = createTooltip(aYardData);

        // 스크롤 및 리사이즈 시 위치 업데이트
        window.addEventListener("scroll", updateTooltipOnEvent, true);
        window.addEventListener("resize", updateTooltipOnEvent);
      }
    });

    // 마우스 벗어날 시
    aYardCard.addEventListener("mouseleave", function (e) {
      // 툴팁으로 이동하는 경우를 체크하기 위해 약간의 지연
      hideTimeout = setTimeout(function () {
        if (tooltip && !tooltip.matches(":hover")) {
          removeTooltip();
        }
      }, 100);
    });

    // 툴팁에 마우스 진입 시
    document.addEventListener(
      "mouseenter",
      function (e) {
        if (tooltip && tooltip.contains(e.target)) {
          if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
          }
        }
      },
      true
    );

    // 툴팁에서 마우스 벗어날 시
    document.addEventListener(
      "mouseleave",
      function (e) {
        if (tooltip && tooltip === e.target) {
          hideTimeout = setTimeout(function () {
            removeTooltip();
          }, 100);
        }
      },
      true
    );
  }
});
