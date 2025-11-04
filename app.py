from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    """홈 페이지"""
    return jsonify({
        'message': 'Flask 서버가 정상적으로 실행 중입니다!',
        'status': 'success'
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """헬스 체크 엔드포인트"""
    return jsonify({
        'status': 'healthy',
        'message': '서버가 정상적으로 동작 중입니다'
    })

@app.route('/api/test', methods=['GET', 'POST'])
def test():
    """테스트 엔드포인트"""
    if request.method == 'GET':
        return jsonify({
            'method': 'GET',
            'message': 'GET 요청이 성공적으로 처리되었습니다'
        })
    elif request.method == 'POST':
        data = request.get_json() or {}
        return jsonify({
            'method': 'POST',
            'message': 'POST 요청이 성공적으로 처리되었습니다',
            'received_data': data
        })

if __name__ == '__main__':
    # 개발 서버 실행
    # host='0.0.0.0'으로 설정하면 외부에서도 접근 가능
    # debug=True로 설정하면 코드 변경 시 자동으로 재시작됨
    app.run(host='0.0.0.0', port=5000, debug=True)

