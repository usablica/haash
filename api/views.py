from django.http import JsonResponse
from models import Cipher
from lib.cipher import AESCipher
import os
import base64
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def encrypt(request):
    text = request.POST['text']

    if text is not None:
        key = os.urandom(16)
        aes = AESCipher(key)
        cipher_obj = Cipher.objects.create(cipher = aes.encrypt(text))
        cipher_obj.save()

        return JsonResponse({'success': True,
                             'id': cipher_obj.pk,
                             'key': base64.b64encode(key)})

def decrypt(request, id, key):
    decoded_key = base64.b64decode(key)
    aes = AESCipher(decoded_key)

    cipher_obj = Cipher.objects.get(pk=id)

    return JsonResponse({'success': True, 'text': aes.decrypt(cipher_obj.cipher)})
