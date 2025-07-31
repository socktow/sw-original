export async function handleZaloPayPayment(paymentData) {
  try {
    const response = await fetch('/api/user/payment/zalo/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
      credentials: 'include',
    });
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || 'Failed to process payment');
    }
    return await response.json();
  } catch (err) {
    console.error('Lỗi handleZaloPayPayment:', err);
    throw new Error(err.message || 'Không thể thực hiện thanh toán');
  }
}

export async function handleZaloQuery(queryData) {
  try {
    const response = await fetch('/api/user/payment/zalo/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(queryData),
      credentials: 'include',
    });
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || 'Failed to query order');
    }
    return await response.json();
  } catch (err) {
    console.error('Lỗi handleZaloQuery:', err);
    throw new Error(err.message || 'Không thể truy vấn đơn hàng');
  }
}

export async function handleHistory(page = 1, limit = 10) {
  try {
    const response = await fetch(
      `/api/user/payment/history?page=${page}&limit=${limit}`,
      { credentials: 'include' }
    );

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || "Failed to fetch payment history");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Lỗi handleHistory:", err);
    throw new Error(err.message || "Không thể lấy lịch sử thanh toán");
  }
}
