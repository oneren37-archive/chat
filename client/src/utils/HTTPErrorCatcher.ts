export async function HTTPErrorCatcher(res: any) {
  if (!res.ok) {
    // 400 - ошибки бизнес логики
    if (res.status === 400) throw new Error(await res.text());
    throw new Error(
      JSON.stringify({
        name: 'Server Error',
        code: null,
        subCode: null,
        message: 'Unknown error',
      }),
    );
  }
  return res;
}
