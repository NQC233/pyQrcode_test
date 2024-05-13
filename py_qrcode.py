import qrcode
import qrcode.image.pil

def gen_qrcode(url, path):

    # Create qr code instance
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )

    # Add data
    qr.add_data(url)
    qr.make(fit=True)

    # Create an image from the QR Code instance
    img = qr.make_image(fill='black', back_color='white')

    # Save it somewhere, change the path as needed
    img.save(path)

    # If you want to show the image
    img.show()


if __name__ == "__main__":
    # 二维码的链接
    info = "https://nqc233.github.io/pyQrcode_test"
    # 生成的图片保存文件
    pic_path = "test.png"
    # 调用函数
    gen_qrcode(info, pic_path)