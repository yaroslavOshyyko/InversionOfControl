// ���� �������� ��������� ������� ��������� ������ �����������������
// ����������� ����������, ������������ � ��������� ����������������
// �������� ����������. ������� README.md � ��� �������.

// ����� �� ����������� ��������� ������
console.log('From application1 global context');

module.exports = function() {
    // ����� �� ��������� �������������� �������
    console.log('From application1 exported function');
};